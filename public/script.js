// Linked to the footer.ejs to provide functionality to application


// Manual hover functions, changing buttong background color and text color

$("#loginButton").on( "mouseenter", 
function(){
    $("#loginButton").removeClass("addSemiDarkColor");
    $("#loginButton").addClass("addBlueColor");
    $("#loginButton").css("color", "white");
}).on( "mouseleave",  
function(){
    $("#loginButton").css("color", "black");
    $("#loginButton").removeClass("addBlueColor"); 
    $("#loginButton").addClass("addSemiDarkColor");
});


$("#signUpButton").on( "mouseenter", 
function(){
    $("#signUpButton").css("color", "black");
    $("#signUpButton").removeClass("addDarkColor");
    $("#signUpButton").addClass("addBlueColor");
}).on( "mouseleave",  
function(){
    $("#signUpButton").css("color", "white");
    $("#signUpButton").removeClass("addBlueColor"); 
    $("#signUpButton").addClass("addDarkColor");
});

$("#headerText").on( "mouseenter", 
function(){
    $("#headerText").text("Om Patel");
    $("#headerText").css("font-size", "20px");
    $(this).attr("href", "https://www.linkedin.com/in/om-patel-726b19243/"); 
}).on( "mouseleave",  
function(){
    $("#headerText").text("The Vault");
    $("#headerText").css("font-size", "20px");
});


$("#bigSignUp").on( "mouseenter", 
function(){
    $("#bigSignUp").css("color", "black");
    $("#bigSignUp").addClass("whiteBG");
}).on( "mouseleave",  
function(){
    $("#bigSignUp").css("color", "white");
    $("#bigSignUp").removeClass("whiteBG");
});

$("#bigLogin").on( "mouseenter", 
function(){
    $("#bigLogin").css("color", "white");
    $("#bigLogin").addClass("blackBG");
}).on( "mouseleave",  
function(){
    $("#bigLogin").css("color", "black");
    $("#bigLogin").removeClass("blackBG");
});

// Fading animation on hover for icons in footer/header
$("#footerIcon").on( "mouseenter", 
function(){
    $("#footerIcon").stop().animate({ "opacity": 0.25 }, 150)
}).on( "mouseleave",  
function(){
    $("#footerIcon").stop().animate({ "opacity": 1 }, 300)
});

$("#headerIcon").on( "mouseenter", 
function(){
    $("#headerIcon").stop().animate({ "opacity": 0.25 }, 150)
}).on( "mouseleave",  
function(){
    $("#headerIcon").stop().animate({ "opacity": 1 }, 300)
});


// Scrolling text in footer
$(function () {
    var footerTexts = [],
        index = 0;
    footerTexts.push("Fast");
    footerTexts.push("Secure");
    footerTexts.push("Powerful");
    footerTexts.push("Try now.");

    function cycle() {
        $('#footerText').text(footerTexts[index]);
        index++;

        if (index === footerTexts.length) {
            index = 0;
        }
        setTimeout(cycle, 2000);
    }
    cycle();
});