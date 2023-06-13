package com.gensphere.ProjectoGensphere;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.gensphere.ProjectoGensphere.storage.StorageProperties;
import com.gensphere.ProjectoGensphere.storage.StorageService;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ProjectoGensphereApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectoGensphereApplication.class, args);
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
//			storageService.deleteAll();
			storageService.init();
		};
	}
}
