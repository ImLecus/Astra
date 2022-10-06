const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
};
const redirect = href => {
    window.location.href = href;
};
const getPosition = element => {
    return new Vector2(element.getBoundingClientRect().x,element.getBoundingClientRect().y);
};
class Vector2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
};
//Close button
Array.from(document.getElementsByClassName("close")).forEach(button =>  {
    button.addEventListener("click", () => {
        setInterval(function(){
            button.parentElement.style.opacity = parseFloat(getComputedStyle(button.parentElement).opacity - 0.1);
            if(getComputedStyle(button.parentElement).opacity <= 0){
                button.parentElement.remove();
            }
        },50);
    });
});

//Input validation
Array.from(document.getElementsByClassName("validation")).forEach(e =>  {
    e.addEventListener("input", () => {
        let isValid = false;
        switch(e.getAttribute("type")){
            case "mail":
                isValid = e.value.includes("@") && e.value.includes(".") ? true: false;
                break;
            case "checkbox":
                if(e.hasAttribute("required")){
                    isValid = e.checked;
                }
                else{
                    isValid = true;
                }
                break;
            default:
                isValid = e.value != "" ? true: false;
                break;
        }
        if(isValid){
            e.classList.add("valid");
            e.classList.remove("invalid");
        }
        else if(e.value != ""){
            e.classList.remove("valid");
            e.classList.add("invalid");
        }
        else{
            e.classList.remove("valid");
            e.classList.remove("invalid");
        }
    }); 
});
//Gradient function
const Gradient = (mode,color1,color2,rotation = "") => {
    if(mode == "radial"){ rotation = ""; }
    if(color1.toString().startsWith("--")){ color1 = `var(${color1})`; }
    if(color2.toString().startsWith("--")){ color2 = `var(${color2})`; }
    return(`${(mode == "linear")? "linear-gradient(" : "radial-gradient("}${(rotation == "")? "": rotation+","}${color1},${color2})`);
};
const parseFunctionClass = (e) => {
    return e.substring(e.indexOf("(") + 1 ,e.indexOf(")"));
}
const parseMediaClass = (e) => {
    return e.substring(e.indexOf("{") + 1 ,e.indexOf("}")).replace(" ","");
}

//Function classes
const FunctionClass = (functionClass,element) => {
    let head = functionClass.substring(0, functionClass.indexOf("("));
    if(head && !head.includes("{")){
        let body = parseFunctionClass(functionClass);
        switch(head){
            default:
                console.error(`The "${head}" function class doesn't exist`);
                break;
            case "gradient":
                let attributes = body.split(",");
                element.style.background = Gradient(attributes[0],attributes[1],attributes[2],attributes[3]);
                break;
            case "bg":
                element.style.backgroundColor = `${(body.startsWith("--"))? "var(" + body + ")": body}`
                break;
            case "span":
                element.style.flexGrow = body;
                break;
            case "width":
                element.style.width = body;
                break;
            case "height":
                element.style.height = body;
                break;
            case "opacity":
                element.style.opacity = `${body}%`;
                break;
            }
        } 
}
document.addEventListener("change", 
Array.from(document.querySelectorAll("*")).filter(e => e.getAttribute("class") != null).forEach(element => {
    element.getAttribute("class").toString().split(" ").forEach(e => { 
        FunctionClass(e,element);
    });
}))

