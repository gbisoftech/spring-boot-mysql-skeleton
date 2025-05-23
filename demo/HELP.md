# Getting Started

### Reference Documentation

For further reference, please consider the following sections:

- [Official Gradle documentation](https://docs.gradle.org)
- [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/3.3.11/gradle-plugin)
- [Create an OCI image](https://docs.spring.io/spring-boot/3.3.11/gradle-plugin/packaging-oci-image.html)
- [Spring Web](https://docs.spring.io/spring-boot/3.3.11/reference/web/servlet.html)

### Guides

The following guides illustrate how to use some features concretely:

- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
- [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### Additional Links

These additional references should also help you:

- [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)

### How to execute

JDK21 install
https://start.spring.io/
-> Gradle - Groovy
-> Java
-> Spring Boot 3.3.11
-> Jat
-> Java 21
-> Spring Web

Becareful VPN and proxy, Anti-virus and firewall

Download gradle-8.13-bin.zip
-> extract to C:\Users\Harrison\.gradle\wrapper\dists\gradle-8.13-bin\5xuhj0ry160q40clulazy9h7d

      gradlew.bat bootRun

## Becareful circular dependencies

AuthService -> Authentication Manager -> Security Config -> JwtAuthFilter -> AuthService(Circular Dependencies)

Solution :

Create Custom UserDetailsService.java

JwtAuthFilter -> CustomUserDetailsService

## To protect route

Modify JwtAuthFilter.java

    if (request.getServletPath().startsWith("/api/auth")) {
      filterChain.doFilter(request, response);
      return;
    }

## When you want to use Builtin Auth Functions with Email instead of Username:

-Add findByEmail() in UserRepository.java

      Optional<User> findByEmail(String email);

-Modify CustomUserDetailsService.java

      public User loadUserByUsername(String email) throws UsernameNotFoundException {
            return userRepository.findByEmail(email)
                  .orElseThrow(() -> new UsernameNotFoundException("User not found : " + email));
      }

-Modify AuthService.java

      Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));

-Modify JwtAuthFilter.java

      User user = this.customUserDetailsService.loadUserByEmail(email);

      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            user.getEmail(),
            null,
            user.getAuthorities());

-To view Authenticated User

      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String email = authentication.getName();

-JwtUtil.java

    return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(user.getEmail())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
        .signWith(getSignInKey(), SignatureAlgorithm.HS512)
        .compact();
