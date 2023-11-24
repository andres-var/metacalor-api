import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateReminderDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  hour: string;
}
