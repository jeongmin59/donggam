package com.example.backend.repository.mariaDB;

import com.example.backend.entity.mariaDB.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {

}
