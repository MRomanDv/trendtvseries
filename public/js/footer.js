const footer = document.querySelector('footer')

function createFooter(){
    footer.innerHTML = `    <div class="footer-logo"><h3>TREND <span class="culture">TV SERIES</span></h3></div>
    <div class="footer-box">
        <div class="footer-content">
            
            <div class="footer-content1">
                <ul class="assistance-list">
                    <li>SUPPORT</li>
                    <li>MEETINGS</li>
                    <li>LEARN ABOUT TREND TV SERIES</li>
                </ul>

            </div>
            
            <div class="footer-content2">
                <!--socialnetwork-->
                <div class="socialNet">
                    <div class="icon-socialNet">
                        <i class="fa-brands fa-twitter"></i>
                    </div>
                    <div class="icon-socialNet">
                        <i class="fa-brands fa-instagram-square"></i>
                    </div>
                    <div class="icon-socialNet">
                        <i class="fa-brands fa-facebook"></i>
                    </div>
                    <div class="icon-socialNet">
                       <i class="fa-brands fa-tiktok"></i>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    `
}

createFooter()