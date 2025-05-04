package com.example.service;

import com.example.model.Article;
import com.example.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

  @Autowired
  private ArticleRepository articleRepository;

  // Create
  public Article createArticle(Article article) {
    return articleRepository.save(article);
  }

  // Read ALL
  public List<Article> getAllArticles() {
    return articleRepository.findAll();
  }

  // Read by ID
  public Optional<Article> getArticleById(Long id) {
    return articleRepository.findById(id);
  }

  // Update
  public Article updateArticle(Long id, Article article) {
    article.setId(id);
    return articleRepository.save(article);
  }

  // Delete
  public void deleteArticle(Long id) {
    articleRepository.deleteById(id);
  }

}
