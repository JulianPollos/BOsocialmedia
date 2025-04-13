let currentPost = 0;       
const maxPosts = 10;       
let allPosts = [];         

function readJson() {
    fetch("posts.json")
        .then(response => response.json())
        .then(data => {
            allPosts = data;   
            addJson();         
        });
}

function addJson() {
    const feed = document.getElementById("posts");

    for (let i = currentPost; i < currentPost + maxPosts; i++) {
        const post = document.createElement("div");
        post.className = "post";

        const username = document.createElement("p");
        username.className = "username";
        username.textContent = allPosts[i].username;  

        const content = document.createElement("p");
        content.className = "post_content";
        content.textContent = allPosts[i].post_content;

        post.appendChild(username);
        post.appendChild(content);
        feed.appendChild(post);
    }

    currentPost += maxPosts;

    const end = document.getElementById("end");

    const endObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            readJson();
            
        }
    });

    endObserver.observe(end);

}

readJson();
