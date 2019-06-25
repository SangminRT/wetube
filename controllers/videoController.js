
import {Videos} from "../db"
export const home = (req, res) => {
    res.render("home",{pageTitle: "Home", Videos}); //videos: videos를 줄여서 적은 것. 이제 home 템플릿에 video가 전달 됨.
};
export const search = (req, res) => {
    // const searchingBy = req.query.term;    // searchingBy는 search.pug 에서 사용됨.
    const {
        query : {term: searchingBy}
    } = req;
    res.render('search',{pageTitle: "Search", searchingBy});    // searchingBy: searchingBy
};       //컨트롤러도 query에 접근하려면, method가 get이어야 함. get method가 url 정보를 추가해 줌. (header.pug 참고)
export const videos = (req,res)=> res.render('videos',{pageTitle: "Videos"});
export const upload = (req,res)=> res.render('upload',{pageTitle: "Upload"});
export const videoDetail = (req,res)=> res.render('videosDetail',{pageTitle: "Videos Detail"});
export const editVideo = (req,res)=> res.render('editVideo',{pageTitle: "Edit Video"});
export const deleteVideo = (req,res)=> res.render('deleteVideo',{pageTitle: "Delete Video"});

/* render 함수의 인자로 템플릿 파일의 이름을 입력해주면 됨. 
이 함수가  views 폴더에서 해당 파일명을 가진, 확장자가 pug인 템플릿 파일을 찾아 보여줌. 
view engine을 설정해 두었기 때문에 자동으로 pug 확장자!		                            */
//render 함수의 첫번째 인자는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체.