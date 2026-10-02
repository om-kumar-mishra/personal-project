package com.example.API.service;
import com.example.API.model.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ItemService {
    private final List<Item> items = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public List<Item> findAll() {
        return items;
    }

    public Optional<Item> findById(Long id) {
        return items.stream().filter(item -> item.getId().equals(id)).findFirst();
    }

    public Item save(Item item) {
        item.setId(counter.incrementAndGet());
        items.add(item);
        return item;
    }

    public void deleteById(Long id) {
        items.removeIf(item -> item.getId().equals(id));
    }

    public Item update(Long id, Item newItem) {
        return findById(id).map(item -> {
            item.setName(newItem.getName());
            item.setDescription(newItem.getDescription());
            return item;
        }).orElse(null);
    }
}
