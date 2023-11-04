package com.example.backend.repository.mariaDB.chat;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("SELECT DISTINCT cr FROM ChatRoom cr WHERE cr.member1.id = ?1 OR cr.member2.id = ?1")
    List<ChatRoom> findAllByMemberId(Long memberId);
}
