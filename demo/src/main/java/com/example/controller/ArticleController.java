package com.example.controller;

import com.example.model.Article;
import com.example.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

  @Autowired
  private ArticleService articleService;

  // Create Article
  @PostMapping
  public ResponseEntity<Article> createArticle(
      @ModelAttribute Article article) {
    Article createArticle = articleService.createArticle(article);
    return new ResponseEntity<>(createArticle, HttpStatus.CREATED);
  }

  // Get All Articles
  @GetMapping
  public ResponseEntity<List<Article>> getAllArticles() {
    List<Article> articles = articleService.getAllArticles();
    return new ResponseEntity<>(articles, HttpStatus.OK);
  }

  // Get Article by Id
  @GetMapping("/{id}")
  public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
    Optional<Article> article = articleService.getArticleById(id);
    return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  // Update article
  @PutMapping("/{id}")
  public ResponseEntity<Article> updateArticle(@PathVariable Long id, @ModelAttribute Article article) {
    Article updatedArticle = articleService.updateArticle(id, article);
    return new ResponseEntity<>(updatedArticle, HttpStatus.OK);
  }

  // Delete Article
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
    articleService.deleteArticle(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
