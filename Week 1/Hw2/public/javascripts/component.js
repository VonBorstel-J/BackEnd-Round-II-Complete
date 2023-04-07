new Vue({
  el: "#my-vue",
  data: {
    headerText: {
      mainHeader: "Food Blog",
      commentHeader: "Comments",
    },
    comments: [
      {
        author: "Brianna",
        date: "February 18, 2021 @ 3:30 pm",
        reply: "REPLY",
        content:
          "Was amazing! My Walmart didn’t have coriander in stock and didn’t have ground cumin. I used serrano instead of jalapeño. It was just like my favorite tortilla soup from BJs. I am sending this recipe to my family. I want everyone to try it!",
      },
      {
        author: "LINH",
        date: "February 15, 2021 @ 9:46 am",
        reply: "REPLY",
        content:
          "I just made this soup today and it’s so tasty! didn’t have corn at home but still turned out very good.  It’s a winner!  I made beef chili for my parents; but since my dad has gout he can’t eat beef; this white chicken chili is perfect for him.  Thank you Lisa!",
      },
      {
        author: "CATHERINE LEONARDO",
        date: "February 13, 2021 @ 12:58 pm",
        reply: "REPLY",
        content:
          "I LOVE this White Chicken Chili! You are right, it is satiating meal—delicious with toasted bread. Refreshingly different taste than any chicken chili I’ve made in the past. I made it exactly as written and added some chopped zucchini, carrots, and celery. Instead of shredding the chicken, I chopped it into small pieces. It freezes very well. Will be an all-time favorite, for sure.",
      },
      {
        author: "KALI",
        date: "February 13, 2021 @ 11:31 am",
        reply: "REPLY",
        content:
          "This recipe is dynamite! My partner usually won’t eat beans but he finished the whole pot (darn was hoping to have some for leftovers haha). This is crowd-pleaser that I am going to add to my regular recipe rotation. Thanks so much, Lisa!",
      },
    ],
    profileImageUrl: "./images/profile.png",
    authorProfile: [
      {
        author: "Brianna",
        foodieLevel: "Novice",
        bio: "Food enthusiast. Love to cook and experiment. Into only organic, fat free, sugar free stuffs!",
      },
      {
        author: "LINH",
        foodieLevel: "Newcomer",
        bio: "Love food! Grew up with meat and potatoes. Recently venture outside my comfort zone. Loving everything I have been eating so far. Thai is my favorite at this time.",
      },
      {
        author: "CATHERINE LEONARDO",
        foodieLevel: "Mentor",
        bio: "I have to say I never was the adventurous type until 2 years ago. My boyfriend, who is of Japanese background, exposed me to other cultural food and I have never look back since!",
      },
      {
        author: "KALI",
        foodieLevel: "Novice",
        bio: "Food is my passion. So is cooking. I love to experiment and try new things. I have to admit I'm a food whore! Invite me over for dinner and I'll be there!",
      },
    ],
    modalName: "",
    modalFoodieLevel: "",
    modalBio: "",
  },
  components: {
    "page-header": {
      props: ["name"],
      template: "<header><span>{{ name }}</span><slot></slot></header>",
    },
    "section-header": {
      props: ["name"],
      template: "<h2>{{ name }}</h2>",
    },
    "chicken-chili": {
      props: ["src"],
      template: "<img :src='src' alt='chicken-chili' width='180' />"
    },
    "blog-nav": {
      template: `<nav class="navbar navbar-expand-sm">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Recipes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Lifestyles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Videos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
    </nav>`
    }
  },
  methods: {
    onclickProfile: function (author) {
      var authorProfile = this.authorProfile.filter(function (profile) {
        return profile.author === author;
      })[0];
      this.modalName = authorProfile.author;
      this.modalFoodieLevel = authorProfile.foodieLevel;
      this.modalBio = authorProfile.bio;
    },
  },
});
