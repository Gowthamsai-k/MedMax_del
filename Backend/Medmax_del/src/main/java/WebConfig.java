


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Method to configure global CORS settings for the entire app
    @SuppressWarnings("null")
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS for all paths ("/**") and specific origins (e.g., your frontend's URL)
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // URL of your frontend (React app)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow methods you need
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (e.g., cookies, authorization headers)
    }
}
