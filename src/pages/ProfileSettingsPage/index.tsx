import clsx from "clsx";
import { useGetUserMeQuery } from "../../api/usersApi";
import { EditIcon, UploadIcon } from "../../assets/icons";
import { UserRoleTag } from "../../components/Users/UserRoleTag";
import Button from "../../components/ui/Button";
import LoaderPage from "../../components/ui/LoaderPage";
import { UserAvatar } from "../../components/Users/UserAvatar";
import styles from "./ProfileSettingsPage.module.css";
import { useHandlers } from "../../common/hooks";

export const ProfileSettingsPage = () => {
  const { data: user, isLoading } = useGetUserMeQuery();

  const { handleUserEditMe } = useHandlers();

  const handleEdit = () => {
    handleUserEditMe();
  };

  if (isLoading) return <LoaderPage />;
  if (!user) return null;

  const infoItems = [
    {
      label: "Имя",
      value: <span className="text_medium">{user.firstName}</span>,
    },
    {
      label: "Фамилия",
      value: <span className="text_medium">{user.lastName}</span>,
    },
    { label: "Роль", value: <UserRoleTag role={user.role} /> },
    {
      label: "Логин",
      value: <span className="text_medium">{user.login}</span>,
    },
  ];

  return (
    <div className={styles.profileSettingsCont}>
      <div className={styles.profileAvatarCont}>
        <UserAvatar user={user} size={128} />
        <div className={styles.profileAvatarSettings}>
          <div>
            <Button icon={<UploadIcon />}>Загрузить новую фотографию</Button>
          </div>
          <p className={clsx("text_medium", styles.profileAvatarSettingsWrap)}>
            Фотография должна быть формата JPG или PNG, желательно квадратной
            ориентации
          </p>
        </div>
      </div>

      <div className={clsx("shadow-container", styles.profileInfoCont)}>
        <div className={styles.profileInfoHeader}>
          <h4>Информация о вас</h4>
          <Button variant="outline" icon={<EditIcon />} onClick={handleEdit}>
            Изменить
          </Button>
        </div>

        <div className={styles.profileInfoContent}>
          {infoItems.map(({ label, value }) => (
            <div key={label} className={styles.profileInfoContentItem}>
              <p
                className={clsx(
                  "text_small",
                  styles.profileInfoContentItemHead
                )}
              >
                {label}
              </p>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
