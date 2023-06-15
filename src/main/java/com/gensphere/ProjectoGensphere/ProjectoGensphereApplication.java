package com.gensphere.ProjectoGensphere;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.gensphere.ProjectoGensphere.storage.StorageProperties;
import com.gensphere.ProjectoGensphere.storage.StorageService;

import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.Resource; // for Spring Boot 2
// import jakarta.annotation.Resource;
import com.gensphere.ProjectoGensphere.uploadFiles.service.FilesStorageService;


@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ProjectoGensphereApplication implements CommandLineRunner {
	@Resource
	FilesStorageService storageService;
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

	@Override
	public void run(String... arg) throws Exception {
//    storageService.deleteAll();
		storageService.init();
	}
}