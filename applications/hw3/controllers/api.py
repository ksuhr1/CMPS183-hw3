# Here go your api methods.


def get_memos():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    memos = []
    has_more = False
    rows = db().select(db.memo.ALL, limitby=(start_idx, end_idx + 1))
    for i, r in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id=r.id,
                is_public=r.is_public,
                user_email=r.user_email,
                title=r.title,
                memo_content=r.memo_content
            )
            memos.append(t)
        else:
            has_more = True
    logged_in = auth.user is not None
    return response.json(dict(
        memos=memos,
        logged_in=logged_in,
        has_more=has_more,
    ))


@auth.requires_signature()
def add_memo():

    t_id = db.memo.insert(
        user_email=request.vars.user_email,
        title=request.vars.title,
        memo_content=request.vars.memo_content
    )

    t = db.memo(t_id)
    return response.json(dict(memo=t))


@auth.requires_signature()
def edit_memo():
    memo = db(db.memo.id == request.vars.id).select().first()
    memo.update_record(title=request.vars.memo_content, memo_content=request.vars.memo_content)

    print memo
    return dict()


@auth.requires_signature()
def del_memo():
    db(db.memo.id == request.vars.memo_id).delete()
    return "ok"


@auth.requires_signature()
def tog_memo():
    memo = db(db.memo.id == request.vars.id).select().first()
    status=request.vars.is_public



    # memo_id = request.vars.memo_id
    # t = db(db.memo.id == memo_id).select().first()
    # t.update_record(is_public=True)
    # # row = db(db.memo.id == request.vars.memo_id).select().first()
    # print t
    # return t




