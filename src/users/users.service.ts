import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from '../email/email.service';
import { UserInfo } from './userInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntiy } from './entiy/user.entiy';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntiy)
    private userEntiyRepository: Repository<UserEntiy>,
  ) {}

  // 회원가입
  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnauthorizedException('이미 가입된 메일 입니다.');
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  // 유저 조회
  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userEntiyRepository.findOne({
      where: { email },
    });

    return user !== undefined;
  }

  // 이메일 인증 로직
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 Token으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    throw new Error('Method not implemented');
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntiy(); // 새로운 유저 엔티티 객체를 생성
    user.id = ulid(); // 인수로 전달받은 유저 정보를 엔티티에 설정
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userEntiyRepository.save(user); // 저장소를 이용하여 엔티티를 데이터베이스에 저장.
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  // 로그인
  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented');
  }

  // 유저 정보 조희
  async getUserInfo(userId: string): Promise<UserInfo> {
    // TODO
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented');
  }
}
