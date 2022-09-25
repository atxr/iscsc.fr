import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticlePreview from "../../components/ArticlePreview";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const { articles, dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles/by-author`);
      const json = await response.json();

      // TODO UPDATE CONTEXT NOT SET
      //    if (response.ok) {
      //      dispatch({ type: "SET", payload: json });
      //    }
    };

    fetchArticles();
  }, [dispatch]);

  const userArticles = articles
    .filter((article) => article.author === user)

  return (
    <div className="blog">
      <div className="blog-header">
        // TODO if user not logged in
        <h2>{user} articles ({userArticles && userArticles.length})</h2>
        <Link to="/blog/create-article" className="blog-header-create">
          Write my own article
        </Link>
      </div>
      <div className="articles">
        {userArticles &&
          userArticles
            .map((article) => (
              <ArticlePreview
                article={article}
                className="article-link"
                key={article._id}
              />
            ))}
      </div>
    </div>
  );
};

export default Profile;
