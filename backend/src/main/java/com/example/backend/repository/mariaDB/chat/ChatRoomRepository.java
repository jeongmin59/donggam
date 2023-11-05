package com.example.backend.repository.mariaDB.chat;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.example.backend.entity.mariaDB.member.Member;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("SELECT DISTINCT cr FROM ChatRoom cr WHERE cr.member1.id = ?1 OR cr.member2.id = ?1")
    List<ChatRoom> findAllByMemberId(Long memberId);

    @Query("SELECT cr FROM ChatRoom cr WHERE cr.member1.id = ?1 AND cr.member2.id = ?2")
    Optional<ChatRoom> findByMember1IdAndMember2Id(Long member1Id, Long member2Id);

    // 내가 아직 들어가 있는 채팅방만 가져옴
    @Query("SELECT DISTINCT cr FROM ChatRoom cr "
            + "WHERE (cr.member1.id = ?1 AND cr.isMember1Active = true) "
            + "OR (cr.member2.id = ?1 AND cr.isMember2Active = true) "
            + "ORDER BY cr.lastChatTime DESC")
    List<ChatRoom> findAllByMemberIdAndIsMemberActiveTrue(Long memberId);
}
