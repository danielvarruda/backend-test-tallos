import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Role(['admin', 'editor'])
  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Role(['admin', 'editor', 'leitor'])
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de um usuário' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Role(['admin', 'editor'])
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Role(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuário' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
