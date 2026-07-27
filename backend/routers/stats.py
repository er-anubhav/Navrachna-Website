from fastapi import APIRouter
from schemas import StatsOut

router = APIRouter(prefix="/api/stats", tags=["stats"])


@router.get("", response_model=StatsOut)
def get_stats():
    return StatsOut(
        startups_incubated=60,
        grants_disbursed="₹2.5 Cr+",
        mentors_connected=120,
        sq_ft_workspace=15000,
        programs_active=5,
        students_impacted=300,
    )
