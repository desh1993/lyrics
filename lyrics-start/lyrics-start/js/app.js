import * as uiInfo from './ui.js';
import {api} from './api.js';

// form validation

uiInfo.searchForm.addEventListener('submit',function(e){
    e.preventDefault();
    if(uiInfo.artistField.value === "" && uiInfo.songField.value === "")
    {
        uiInfo.messagesDiv.innerHTML= "Error.. All fields are mandatory";
        uiInfo.messagesDiv.classList.add("error");
        setTimeout(function(){
            uiInfo.messagesDiv.classList.remove("error");
            uiInfo.messagesDiv.innerHTML= "";
        },3000);
    }
    else
    {
        //query the rest api
        let lyrics = new api(uiInfo.artistField.value,uiInfo.songField.value);
        lyrics.queryAPI()
        .then(data => {
            console.log(data);
            console.log(data.lyric.error);
            if( data.lyric.lyrics)
            {
                let result = data.lyric.lyrics;
                uiInfo.resultDiv.innerHTML = result ;
            }
            else
            {
                uiInfo.resultDiv.innerHTML= "No Lyrics found";
                uiInfo.resultDiv.classList.add("error");
                setTimeout(function(){
                    uiInfo.resultDiv.classList.remove("error");
                    uiInfo.resultDiv.innerHTML= "";
                },3000);
                uiInfo.searchForm.reset();
            }
           
        });
        
    }
});
