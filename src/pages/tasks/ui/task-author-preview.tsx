import { UserPreview, useUsers } from '@/entities/user';

export function TaskAuthorPreview({ authorId } : {authorId: string | undefined}) {
  const getUserById = useUsers((s) => s.getUserById);

  const author = authorId ? getUserById(authorId) : null;

  if (!author) {
    return <div>Автор не назначен</div>;
  }

  return  <UserPreview size="md" {...author} />;
}