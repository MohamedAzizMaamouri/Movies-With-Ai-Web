from fastapi import APIRouter, Query
from typing import Optional
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

@router.get("/genres")
async def genres():
    return await tmdb.get_tv_genres()

@router.get("/discover")
async def discover(
    page: int = Query(1),
    genre_id: Optional[int] = None,
    year: Optional[int] = None,
    min_rating: Optional[float] = None,
):
    return await tmdb.discover_tv(page, genre_id, year, min_rating)

@router.get("/{tv_id}")
async def detail(tv_id: int):
    return await tmdb.get_tv_detail(tv_id)