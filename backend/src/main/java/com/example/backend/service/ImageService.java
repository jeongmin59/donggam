package com.example.backend.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.type.CustomException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
@Component
public class ImageService {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  public String uploadImage(MultipartFile multipartFile, String dirName) throws IOException {
    File uploadFile = convert(multipartFile);  // 파일 변환할 수 없으면 에러
    return upload(uploadFile, dirName);
  }

  public String upload(File uploadFile, String filePath) {
    String fileName = filePath + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
    String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
    removeNewFile(uploadFile);
    return uploadImageUrl;
  }

  // S3로 업로드
  private String putS3(File uploadFile, String fileName) {
    amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }

  // 로컬에 저장된 이미지 지우기
  private void removeNewFile(File targetFile) {
    if (targetFile.delete()) {
      System.out.println("File delete success");
      return;
    }
    System.out.println("File delete fail");
  }

  // 로컬에 파일 업로드 하기
  private File convert(MultipartFile multipartFile) throws IOException {
    File file = new File(multipartFile.getOriginalFilename());
    multipartFile.transferTo(file);
    return file;
  }
}
