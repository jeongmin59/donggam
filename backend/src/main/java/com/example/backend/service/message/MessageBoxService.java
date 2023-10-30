package com.example.backend.service.message;

import com.example.backend.repository.mariaDB.message.MessageBoxRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageBoxService {
    private final MessageBoxRepository messageBoxRepository;
}
