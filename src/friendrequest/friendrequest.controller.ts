import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { FriendRequestService } from './friendrequest.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('friendrequests')
@UseGuards(AuthGuard('jwt'))
export class FriendRequestController {
   constructor(private readonly friendRequestService: FriendRequestService) {}

   @Post()
   async sendRequest(@Body() body: { IDSender: string; IDReceiver: string }) {
      return this.friendRequestService.sendRequest(
         body.IDSender,
         body.IDReceiver,
      );
   }

   @Post('accept/:friendRequestId')
   async acceptRequest(
      @Param('friendRequestId') friendRequestId: string,
      @Body() body: { IDSender: string; IDReceiver: string },
   ) {
      return this.friendRequestService.acceptRequest(
         body.IDSender,
         body.IDReceiver,
         friendRequestId,
      );
   }

   @Post('decline/:friendRequestId')
   async declineRequest(
      @Param('friendRequestId') friendRequestId: string,
      @Body() body: { IDSender: string; IDReceiver: string },
   ) {
      return this.friendRequestService.declineRequest(
         body.IDSender,
         body.IDReceiver,
         friendRequestId,
      );
   }

   @Get('pending/:userId')
   async getPendingRequests(@Param('userId') userId: string) {
      return this.friendRequestService.getPendingRequestsForUser(userId);
   }
}
