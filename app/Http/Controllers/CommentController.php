<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'news_id' => 'required',
        ]);

        $comment = new Comment();
        $comment->content = $request->content;
        $comment->news_id = $request->news_id;
        $comment->user_id = auth()->id();
        $comment->parent_id = $request->parent_id;
        $comment->save();

        return response('Thanks for your comment');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required',
        ]);

        $comment = Comment::find($id);
        $comment->content = $request->content;
        $comment->save();

        return response()->json($comment);
    }

    public function getTotalComment($news_id)
    {
        $comments = Comment::where('news_id', $news_id)->get()->count();
        return $comments;
    }

    public function getComments(Request $request, $news_id)
    {
        $comments = Comment::with('user')
            ->where('news_id', $news_id)
            ->whereNull('parent_id')
            ->skip($request->skip)
            ->take($request->take)
            ->get()->map(function ($comment, $key) {
                $comment->replies = Comment::where('parent_id', $comment->id)
                    ->get()
                    ->count();
                return $comment;
            });
        $totalComments = $this->getTotalComment($news_id);
        return response()->json([
            'comments' => $comments,
            'total_comment' => $totalComments
        ]);
    }

    public function getReplies($comment_id)
    {
        $replies = Comment::with('user')
            ->where('parent_id', $comment_id)
            ->get()->map(function ($comment, $key) {
                $comment->replies = Comment::where('parent_id', $comment->id)
                    ->get()
                    ->count();
            });

        return response()->json($replies);
    }
}
