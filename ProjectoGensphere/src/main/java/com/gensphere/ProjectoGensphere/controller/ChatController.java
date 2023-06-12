package com.gensphere.ProjectoGensphere.controller;


import com.gensphere.ProjectoGensphere.model.entity.ChatMessage;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
//@CrossOrigin(origins="*")
public class ChatController {
    @MessageMapping("/chat.reply")
    @SendTo("/topic/public/reply")
    public ReplyMessage sendMessage(@Payload ReplyMessage replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
