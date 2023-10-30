package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.member.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

  Optional<Member> findByEmail(String email);

  @Query("SELECT m FROM Member m LEFT JOIN FETCH m.status s WHERE m.id = :memberId ORDER BY s.id DESC")
  Optional<Member> findWithStatus(@Param("memberId") Long memberId);

  boolean existsByEmail(String email);

  @EntityGraph(attributePaths = {"status"})
  List<Member> findByLocationIdIn(List<Long> locationIds);
}
