export const PERMISSIONS = {
  //requests
  MANAGE_REQUESTS: 'manage_requests',
  CREATE_REQUESTS: 'create_requests',
  VIEW_REQUESTS: 'view_requests',
  EDIT_REQUESTS: 'edit_requests',
  DELETE_REQUESTS: 'delete_requests',
  //brands
  MANAGE_BRANDS: 'manage_brands',
  CREATE_BRANDS: 'create_brands',
  VIEW_BRANDS: 'view_brands',
  EDIT_BRANDS: 'edit_brands',
  DELETE_BRANDS: 'delete_brands',
  //files
  UPLOAD_FILES: 'upload_files',
  DELETE_FILES: 'delete_files',
  MANAGE_FILES: 'manage_files',
  VIEW_FILES: 'view_files',
  //workspace
  MANAGE_WORKSPACE: 'manage_workspace',
  VIEW_WORKSPACE: 'view_workspace',
  EDIT_WORKSPACE: 'edit_workspace',
  //members
  MANAGE_MEMBERS: 'manage_members',
  VIEW_MEMBERS: 'view_members',
  EDIT_MEMBERS: 'edit_members',
  DELETE_MEMBERS: 'delete_members',
  INVITE_MEMBERS: 'invite_members',
  //Dashboard permissions
  MANAGE_DASHBOARD: 'manage_dashboard',
  VIEW_DASHBOARD: 'view_dashboard',
  EDIT_DASHBOARD: 'edit_dashboard',
  //user assignments
  USER_ASSIGNMENTS: 'user_assignments',
  //comments
  MANAGE_COMMENTS: 'manage_comments',
  VIEW_COMMENTS: 'view_comments',
  CREATE_COMMENTS: 'create_comments',
  EDIT_COMMENTS: 'edit_comments',
  DELETE_COMMENTS: 'delete_comments',
  //feedback
  MANAGE_FEEDBACK: 'manage_feedback',
  CREATE_FEEDBACK: 'create_feedback',
  VIEW_FEEDBACK: 'view_feedback',
  EDIT_FEEDBACK: 'edit_feedback',
  DELETE_FEEDBACK: 'delete_feedback',

  //settings
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  DELETE_SETTINGS: 'delete_settings',
  //plan
  MANAGE_PLAN: 'manage_plan',
  VIEW_PLAN: 'view_plan',
  EDIT_PLAN: 'edit_plan',
  DELETE_PLAN: 'delete_plan',
  //user profile
  EDIT_PROFILE: 'edit_profile',
  VIEW_PROFILE: 'view_profile',
  MANAGE_PROFILE: 'manage_profile',

  // ...etc.
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
