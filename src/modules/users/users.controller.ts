import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { NotificationsGateway } from '../../notifications/notifications.gateway'; // Importamos el Gateway
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { FindById } from './dto/find-by-id.dto';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';

@ApiTags('Users')
@ApiBearerAuth()
 
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsGateway: NotificationsGateway,
  ) { }

  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Get()
  @ApiResponse({ status: 200, description: 'List of users', type: [CreateUserDto] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit of users per page' })
  async findAll(@Query() pagination: PaginationDTO) {
    const usersData = await this.usersService.findAll(pagination);
    const users = usersData.users;

   
    this.notificationsGateway.notifyAll('notification', {
      action: 'findAllUsers',
      message: `Fetched ${users.length} users`, 
      data: users
    });

    return usersData;
  }
  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found', type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async findOne(@Param('id') id: FindById) {
    const user = await this.usersService.findOne(id);
    
  
    this.notificationsGateway.notifyAll('notification', {
      action: 'findOne',
      message: `Fetched user with ID: ${id}`,
      data: user
    });

    return user;
  }
  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated', type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id') id: FindById, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    

    this.notificationsGateway.notifyAll('notification', {
      action: 'update',
      message: `User with ID: ${id} updated`,
      data: updatedUser
    });

    return updatedUser;
  }
  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User removed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async remove(@Param('id') id: FindById) {
    const result = await this.usersService.remove(id);
    

    this.notificationsGateway.notifyAll('notification', {
      action: 'remove',
      message: `User with ID: ${id} removed`,
      data: { id }
    });

    return result;
  }
}
