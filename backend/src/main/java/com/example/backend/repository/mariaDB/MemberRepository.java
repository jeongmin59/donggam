package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.member.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

  Optional<Member> findByEmail(String email);

  @EntityGraph(attributePaths = {"status"})
  Optional<Member> findWithRelatedEntityById(Long memberId);

  boolean existsByEmail(String email);

  List<Member> findByLocationIdIn(List<Long> locationIds);
}
