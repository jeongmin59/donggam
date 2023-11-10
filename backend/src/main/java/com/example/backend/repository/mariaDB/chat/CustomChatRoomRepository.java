package com.example.backend.repository.mariaDB.chat;

import static com.example.backend.entity.mariaDB.chat.QChat.chat;
import static com.example.backend.entity.mariaDB.chat.QChatRoom.chatRoom;
import static com.example.backend.entity.mariaDB.member.QMember.member;

import com.example.backend.entity.mariaDB.chat.ChatRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CustomChatRoomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomChatRoomRepository(JPAQueryFactory queryFactory) {
        super(ChatRoom.class);
        this.queryFactory = queryFactory;
    }

    // 내가 들어가있는 방만 가져옴
    public List<ChatRoom> findAllByMemberIdAndIsMemberActiveTrue(Long memberId) {
        return queryFactory
                .selectDistinct(chatRoom)
                .from(chatRoom)
                .leftJoin(chatRoom.chat, chat).fetchJoin()
                .leftJoin(chatRoom.member1, member)
                .leftJoin(chatRoom.member2, member)
                .where(chatRoom.member1.id.eq(memberId).and(chatRoom.isMember1Active.isTrue())
                        .or(chatRoom.member2.id.eq(memberId).and(chatRoom.isMember2Active.isTrue())))
                .orderBy(chatRoom.lastChatTime.desc())
                .fetch();
    }

    public ChatRoom findByRoomId(Long roomId) {
        return queryFactory
                .selectFrom(chatRoom)
                .leftJoin(chatRoom.chat, chat).fetchJoin()
                .where(chatRoom.id.eq(roomId))
                .fetchOne();
    }

}
