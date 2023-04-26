import { Body, Controller, Delete, Get, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) { }

    @ApiTags('API')
    @ApiResponse({
        status: 201,
        type: CreateAssetResponse
    })
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: WatchlistDto, @Request() request): Promise<CreateAssetResponse> {
        const user = request.user
        return this.watchlistService.createAsset(user, assetDto)
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('getAll')
    // getAllAssets() {
    //     return
    // }

    // @UseGuards(JwtAuthGuard)
    // @Patch('update')
    // updateAsset() {
    //     return
    // }
    @ApiTags('API')
    @ApiResponse({
        status: 200
    })
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId: string, @Request() request): Promise<boolean> {
        const { id } = request.user
        return this.watchlistService.deleteAsset(id, assetId)
    }

}
