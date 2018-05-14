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
                user_email=r.user_email,
                title=r.title,
                memo_content=r.memo_content,
                is_public=r.is_public

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

def get_user_name_from_email(email):
    """Returns a string corresponding to the user first and last names,
    given the user email."""
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'None'
    else:
        return ' '.join([u.first_name, u.last_name])


@auth.requires_signature()
def add_memo():
    """Here you get a new memo and add it.  Return what you want."""
    # Implement me!
    user_email = auth.user.email or None
    p_id = db.memo.insert(title=request.vars.title, memo_content=request.vars.memo_content)
    p = db.memo(p_id)
    name = get_user_name_from_email(p.user_email)
    memo = dict(
        id=p.id,
        title=p.title,
        user_email=p.user_email,
        content=p.memo_content,
        first_name=name[0],
        last_name=name[1]

    )
    print p
    return response.json(dict(memo=memo))
    # user_email = auth.user.email or None
    # t_id = db.memo.insert(
    #     id=request.vars.id,
    #     user_email=request.vars.user_email,
    #     title=request.vars.title,
    #     memo_content=request.vars.memo_content
    # )
    # 
    # t = db.memo(t_id)
    # return response.json(dict(memo=t))


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
    q = db.memo.id == request.vars.memo_id
    row = db(q).select().first()
    if row.is_public is True:
        row.is_public = False
        row.update_record()
    else:
        row.is_public = True
        row.update_record()
    return response.json(dict())




