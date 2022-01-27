import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
    
    @ApiProperty()
    role: string;
    
    @ApiProperty()
    sector: string;
}
