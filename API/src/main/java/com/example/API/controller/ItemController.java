package com.example.API.controller;
import com.example.API.model.BaseResponse;
import com.example.API.model.CommonResponse;
import com.example.API.model.Item;
import com.example.API.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemService itemService;


    @GetMapping
    public CommonResponse getAllItems() {
        CommonResponse response = new CommonResponse();
        response.info.code = 100;
        response.info.message ="Success";
        response.data=itemService.findAll();
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.findById(id)
                .map(item -> ResponseEntity.ok(item))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody Item item) {
        BaseResponse response = new BaseResponse();
        response.info.code = 100;
        response.info.message ="Successfully added";

        Item savedItem = itemService.save(item);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Item item) {
        System.out.println(item);
        Item updatedItem = itemService.update(id, item);
        BaseResponse response = new BaseResponse();
        if (updatedItem == null) {
            response.info.code=102;
            response.info.message="Not found";
            return ResponseEntity.notFound().build();
        }
        response.info.code=100;
        response.info.message="successfully updated";

        return ResponseEntity.ok(response);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        BaseResponse response = new BaseResponse();
        response.info.code=100;
        response.info.message="successfully deleted";
        itemService.deleteById(id);
        return ResponseEntity.ok(response);
    }
}
