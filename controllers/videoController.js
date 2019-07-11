import routes from "../routes";
import Video from "../models/Video"     // 이건 Database의 element가 아니라 단지 model이다. element를 받는 통로일 뿐, element 자체는 아님.

export const home = async(req, res) => {  // Javascript는 동시에 많은 일들을 처리함. 때문에 Javascript가 기다리게 해야할 때는 keyword를 추가해야 함.  (async - 이 function의 어떤 부분은 꼭 기다려야 한다고 이야기 해줌.)
    //const videos = await Video.find({});    // Database에 있는 모든 Video를 가져옴.     await keyword는 async 없이는 쓸 수 없음. (await is only valid in async function)
                                            // 이렇게 하면 await 부분이 끝나기 전까지는 render 부분을 실행하지 않을 것이란 걸 확실하게 보여줌. (단, await 부분이 성공해야하는 건 아님, 실패해도 일단 끝이 나면 다음으로 넘어감.)
    try{                                        // -> 때문에 발생할 수 있는 모든 error를 고려해서 작성.
        const videos = await Video.find({});
        res.render("home",{pageTitle: "Home", videos}); //videos: videos를 줄여서 적은 것. 이제 home 템플릿에 video가 전달 됨.
    } catch(error) {
        console.log(error);
        res.render("home",{pageTitle: "Home", videos:[]});  // error가 생기면 video는 없을 것. default로 videos는 빈 array가 됨.      
    }
};

export const search = (req, res) => {
    // const searchingBy = req.query.term;    // searchingBy는 search.pug 에서 사용됨.
    const {
        query : {term: searchingBy}
    } = req;
    res.render('search',{pageTitle: "Search", searchingBy, videos});    // searchingBy: searchingBy
};       //컨트롤러도 query에 접근하려면, method가 get이어야 함. get method가 url 정보를 추가해 줌. (header.pug 참고)

export const getUpload = (req,res)=> {
    res.render('upload',{pageTitle: "Upload"});
};
export const postUpload = async(req,res) => {
    const {
        body: {title, description},     //upload.pug        안에 설정해둔  name = ~~
        file: {path}
    } = req;                               
    // console.log(file, title, description);  
    /*
   const {body, file} = req;
   console.log(body,file);        // -> upload때 무슨 일이 일어나는지 알아보기 위함.          */
    const newvideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    //console.log(newvideo)
    //res.redirect(routes.videoDetail(324516));   // 324516는 임시 가짜 db에 설정해둔 id
    res.redirect(routes.videoDetail(newvideo.id));
};


export const videoDetail = async(req,res)=> {
    //console.log(req.params);    //만약 controller에서 어떤 data를 가지고 있다는 것을 표현하고 싶다면, 더블콜론(:)과 이름을 넣으면 됨. - routes.js에서
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);                  // mongoose가 여러가지 옵션들을 가지고 있음. https://mongoosejs.com/docs/queries.html
                                                        //parameter는 ID이고 ID의 값이 query로 보내짐.
         // console.log(video);
        res.render('videoDetail',{pageTitle: "Videos Detail", video});  // video 변수를 템플릿에 전달하기 위해 'video'('video: video'와 같음)를 추가. 
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const editVideo = (req,res)=> res.render('editVideo',{pageTitle: "Edit Video"});
export const deleteVideo = (req,res)=> res.render('deleteVideo',{pageTitle: "Delete Video"});

/* render 함수의 인자로 템플릿 파일의 이름을 입력해주면 됨. 
이 함수가  views 폴더에서 해당 파일명을 가진, 확장자가 pug인 템플릿 파일을 찾아 보여줌. 
view engine을 설정해 두었기 때문에 자동으로 pug 확장자!		                            */
//render 함수의 첫번째 인자는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체.