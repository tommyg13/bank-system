const template = document.createElement("template");
template.innerHTML = `
    <header>
    <nav role="navigation" aria-label="Main Navigation" class="header-container">
        <div class="header-inner header-left"><h1>Bank System</h1></div>
        <div class="header-inner header-right">
        <button class="toggle-menu mobile-only" aria-label="Toggle Menu" aria-controls="menu" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>        
        </button>
          <ul class="menu" id="menu"></ul>
        </div>
      </nav>
    </header>
    <style>
    .header-container{
        display:flex;
        align-items:center;
        justify-content:space-between;
        box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.09);
        -webkit-box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.09);
        -moz-box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.09);
        position:fixed;
        top:0;
        left:0;
        right:0;
        padding:10px 25px;
    }
    li{
        list-style:none;
      }

      .menu {
        display:flex;
        gap:10px
      }
      a{
        text-decoration:none;
        color:#000
      }
      li.active a{
        color: blue;
      }
      .mobile-only{
        display:none;

      }
@media (max-width:1200px){
    .mobile-only{
        display:block;

      }
      .menu {
       display:none; 
       flex-direction:column;
       position:absolute;
       top:30px;
       left:-50px;
       margin:0;
       padding:10px 20px;
       box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.09);
       -webkit-box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.09);
       -moz-box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.09);
       border: 1px solid #000;
       background:#fff
      }
      .header-right{
        position: relative
      }
}
    </style>
`;

class BankHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    this.executeScript();
    this.handleMenuClick();
  }

  executeScript() {
    const user = localStorage.getItem("user");
    const menu = this.shadowRoot.querySelector(".menu");
    let navItems = [];
    const currentPage = window.location.pathname;
    const currentRoute = currentPage
      .replace("/pages/", "")
      .replace(".html", "")
      .toUpperCase();

    if (!user) {
      if (currentRoute !== "LOGIN" && currentRoute !== "REGISTER") {
        window.location.href = "/pages/login.html";
      }
      navItems = ["Login", "Register"];
    } else {
      navItems = ["Dashboard", "Account", "Transactions"];
    }

    for (let item of navItems) {
      const li = document.createElement("li");
      if (currentRoute === item.toUpperCase()) {
        li.classList.add("active");
      }
      const anchor = document.createElement("a");
      anchor.href = `/pages/${item.toLowerCase()}.html`;
      anchor.textContent = item;
      li.appendChild(anchor);
      menu.appendChild(li);
    }
  }

  handleMenuClick() {
    const menuBtn = this.shadowRoot.querySelector(".toggle-menu");
    const menu = this.shadowRoot.querySelector(".menu");
    menuBtn.addEventListener("click", function () {
      const currentMenuState = menu.style.display;
      let nextState = "";
      if (currentMenuState === "flex") {
        nextState = "none";
        menuBtn.setAttribute("aria-expanded", "false");
      } else {
        nextState = "flex";
        menuBtn.setAttribute("aria-expanded", "true");
      }
      menu.style.display = nextState;
    });
  }
}

customElements.define("bank-header", BankHeader);
