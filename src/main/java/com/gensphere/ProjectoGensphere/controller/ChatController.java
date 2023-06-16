package com.gensphere.ProjectoGensphere.controller;


import com.gensphere.ProjectoGensphere.model.entity.ChatMessage;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage2;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage3;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage4;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage5;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage6;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage7;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage8;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage9;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage10;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage11;
import com.gensphere.ProjectoGensphere.model.entity.ChatMessage12;

import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage2;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage3;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage4;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage5;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage6;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage7;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage8;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage9;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage10;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage11;
import com.gensphere.ProjectoGensphere.model.entity.ReplyMessage12;

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

    @MessageMapping("/chat.reply2")
    @SendTo("/topic/public/reply2")
    public ReplyMessage2 sendMessage(@Payload ReplyMessage2 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send2")
    @SendTo("/topic/public2")
    public ChatMessage2 sendMessage(@Payload ChatMessage2 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply3")
    @SendTo("/topic/public/reply3")
    public ReplyMessage3 sendMessage(@Payload ReplyMessage3 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send3")
    @SendTo("/topic/public3")
    public ChatMessage3 sendMessage(@Payload ChatMessage3 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply4")
    @SendTo("/topic/public/reply4")
    public ReplyMessage4 sendMessage(@Payload ReplyMessage4 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send4")
    @SendTo("/topic/public4")
    public ChatMessage4 sendMessage(@Payload ChatMessage4 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply5")
    @SendTo("/topic/public/reply5")
    public ReplyMessage5 sendMessage(@Payload ReplyMessage5 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send5")
    @SendTo("/topic/public5")
    public ChatMessage5 sendMessage(@Payload ChatMessage5 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply6")
    @SendTo("/topic/public/reply6")
    public ReplyMessage6 sendMessage(@Payload ReplyMessage6 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send6")
    @SendTo("/topic/public6")
    public ChatMessage6 sendMessage(@Payload ChatMessage6 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply7")
    @SendTo("/topic/public/reply7")
    public ReplyMessage7 sendMessage(@Payload ReplyMessage7 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send7")
    @SendTo("/topic/public7")
    public ChatMessage7 sendMessage(@Payload ChatMessage7 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply8")
    @SendTo("/topic/public/reply8")
    public ReplyMessage8 sendMessage(@Payload ReplyMessage8 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send8")
    @SendTo("/topic/public8")
    public ChatMessage8 sendMessage(@Payload ChatMessage8 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply9")
    @SendTo("/topic/public/reply9")
    public ReplyMessage9 sendMessage(@Payload ReplyMessage9 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send9")
    @SendTo("/topic/public9")
    public ChatMessage9 sendMessage(@Payload ChatMessage9 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply10")
    @SendTo("/topic/public/reply10")
    public ReplyMessage10 sendMessage(@Payload ReplyMessage10 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send10")
    @SendTo("/topic/public10")
    public ChatMessage10 sendMessage(@Payload ChatMessage10 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply11")
    @SendTo("/topic/public/reply11")
    public ReplyMessage11 sendMessage(@Payload ReplyMessage11 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send11")
    @SendTo("/topic/public11")
    public ChatMessage11 sendMessage(@Payload ChatMessage11 chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.reply12")
    @SendTo("/topic/public/reply12")
    public ReplyMessage12 sendMessage(@Payload ReplyMessage12 replyMessage) {
        return replyMessage;
    }

    @MessageMapping("/chat.send12")
    @SendTo("/topic/public12")
    public ChatMessage12 sendMessage(@Payload ChatMessage12 chatMessage) {
        return chatMessage;
    }




}
