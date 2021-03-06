import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Blog from "./components/Blog/Blog";
import BlogPost from "./components/Blog/BlogPost";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

// import BlogPage from './components/BlogPage'
import Forum from "./components/Forum/Forum";
import ForumPost from "./components/Forum/ForumPost";
import NewForumPost from "./components/Forum/NewForumPost";
import Store from "./components/Store/Store";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import NewPost from "./components/Blog/NewPost";
import EditPost from "./components/Blog/EditPost";
import EditForumPost from "./components/Forum/EditForumPost"
library.add(fab, far, fas);

function App() {
  return (
    <Router className="App">
      <main>
        <div id="content-wrap">
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blog" component={() => <Blog />} />
            <Route path="/blogpost/:blogID" component={BlogPost} />
            <Route path="/editpost/:blogID" component={EditPost} />
            <Route path="/newpost" component={NewPost} />
            <Route path="/forum" component={Forum} />
            <Route path="/forumpost/:forumID" component={ForumPost} />
            <Route path="/newforumpost" component={NewForumPost} />
            <Route path="/editforumpost/:forumID" component={EditForumPost} />
            <Route path="/store" component={Store} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
