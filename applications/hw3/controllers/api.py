# Here go your api methods.

import random


def get_memos():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0

    # generate a lot of data

    memos = []

    for i in range(start_idx, end_idx):
        t = dict(
            title=random.choice(['Hi', 'WAS SUP', 'WHAT IS HAPPENING']),
            text=random.choice(['this sucks', 'wow', 'wish i was home']),
        )
        memos.append(t)
    has_more = True
    logged_in = False
    return response.json(dict(
        memos=memos,
        logged_in=logged_in,
        has_more=has_more,
    ))

