from fastapi import APIRouter, Query
from app.services import tmdb

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/")
async def search(q: str = Query(..., min_length=1), page: int = Query(1)):
    return await tmdb.search_multi(q, page)

@router.get("/movies")
async def search_movies(q: str = Query(...), page: int = Query(1)):
    return await tmdb.search_movies(q, page)

@router.get("/tv")
async def search_tv(q: str = Query(...), page: int = Query(1)):
    return await tmdb.search_tv(q, page)