package com.hexclan.tparchitecture.controller.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/json")
public class JsonController {

    @GetMapping("/postman")
    public ResponseEntity<?> getJsonPostman() throws IOException {
        return ResponseEntity.ok().header("Content-Type", "application/json").body(getFileData("static/postman.json"));
    }

    @GetMapping("/insomnia")
    public ResponseEntity<?> getJsonInsomnia() throws IOException {
        return ResponseEntity.ok().header("Content-Type", "application/json").body(getFileData("static/insomnia.json"));
    }

    private String getFileData(String filename) throws IOException {
        InputStream is = new ClassPathResource(filename).getInputStream();

        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        return reader.lines().collect(Collectors.joining("\n"));
    }
}
