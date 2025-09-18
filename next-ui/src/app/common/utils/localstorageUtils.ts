'use client'
const themePrimaryColorKey = "themePrimaryColor"

export const saveThemeColorToLocal = (color:string) => {
    if(localStorage){
        localStorage.setItem(themePrimaryColorKey, color);
    }

}

export const getThemeColor = ():(string | null) => {
    try{
    if(localStorage){
        return localStorage.getItem(themePrimaryColorKey);
    }
    }
    catch(error){
        console.log("error:" + error)
    }
    return null;
}