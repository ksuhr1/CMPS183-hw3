# Here go your api methods.


def get_memos():
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    memos = []
    has_more = False
<<<<<<< HEAD
    rows = db().select(db.memo.ALL, limitby=(start_idx, end_idx+1))

=======
    rows = db().select(db.memo.ALL, limitby=(start_idx, end_idx + 1))
>>>>>>> phase3
    for i, r in enumerate(rows):
        if i < end_idx - start_idx:
            t = dict(
                id=r.id,
<<<<<<< HEAD
                title=r.title,
                content=r.memo_content,
=======
                is_public=r.is_public,
                user_email=r.user_email,
                title=r.title,
                memo_content=r.memo_content
>>>>>>> phase3
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
<<<<<<< HEAD
    t_id = db.memo.insert(
        title=request.vars.title,
        memo_content=request.vars.content
    )
=======

    t_id = db.memo.insert(
        user_email=request.vars.user_email,
        title=request.vars.title,
        memo_content=request.vars.memo_content
    )

>>>>>>> phase3
    t = db.memo(t_id)
    return response.json(dict(memo=t))


@auth.requires_signature()
<<<<<<< HEAD
def del_memo():
    db(db.memo.id == request.vars.memo_id).delete()
    return"ok"
=======
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
    q = db.memo.id == request.vars.memo_id
    row = db(q).select().first()
    if row.is_public is True:
        row.is_public = False
        row.update_record()
    else:
        row.is_public = True
        row.update_record()
    return response.json(dict())



>>>>>>> phase3

