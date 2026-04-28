from fastapi import APIRouter, Query
from app.services import tmdb

router = APIRouter(prefix="/tv", tags=["tv"])

@router.get("/popular")
async def popular(page: int = Query(1)):
    return await tmdb.get_popular_tv(page)

@router.get("/trending")
async def trending():
    return await tmdb.get_trending_tv()

@router.get("/top-rated")
async def top_rated(page: int = Query(1)):
    return await tmdb.get_top_rated_tv(page)

@router.get("/{tv_id}")
async def detail(tv_id: int):
    return await tmdb.get_tv_detail(tv_id)