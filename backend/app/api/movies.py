from fastapi import APIRouter, Query
from typing import Optional
from app.services import tmdb

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/popular")
async def popular(page: int = Query(1)):
    return await tmdb.get_popular_movies(page)

@router.get("/trending")
async def trending():
    return await tmdb.get_trending_movies()

@router.get("/top-rated")
async def top_rated(page: int = Query(1)):
    return await tmdb.get_top_rated_movies(page)

@router.get("/upcoming")
async def upcoming(page: int = Query(1)):
    return await tmdb.get_upcoming_movies(page)

@router.get("/genres")
async def genres():
    return await tmdb.get_movie_genres()

@router.get("/discover")
async def discover(
    page: int = Query(1),
    genre_id: Optional[int] = None,
    year: Optional[int] = None,
    min_rating: Optional[float] = None,
):
    return await tmdb.discover_movies(page, genre_id, year, min_rating)

@router.get("/{movie_id}")
async def detail(movie_id: int):
    return await tmdb.get_movie_detail(movie_id)