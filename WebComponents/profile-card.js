class ProfileCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.src = this.getAttribute('imgsrc');
        img.alt = 'Profile Picture';
        wrapper.appendChild(img);

        const username = document.createElement('p');
        username.textContent = this.getAttribute('username');
        wrapper.appendChild(username);

        const followButton = document.createElement('button');
        followButton.textContent = 'Seguir';
        followButton.setAttribute('class', 'botonSeguir');
        followButton.addEventListener('click', () => {
            if (followButton.textContent === 'Seguir') {
                followButton.textContent = 'Dejar de seguir';
                followButton.setAttribute('class', 'botonDejar');
            } else {
                followButton.textContent = 'Seguir';
                followButton.setAttribute('class', 'botonSeguir');
            }
        });
        wrapper.appendChild(followButton);

        const style = document.createElement('style');
        style.textContent = `
            @import "style.css";
        `;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('profile-card', ProfileCard);