import {
  Button,
  Card,
  Divider,
  FileInput,
  Select,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePostJob } from "../hooks/usePostJob";

interface PostJobFormProps {
  isEditMode: boolean;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ isEditMode }) => {
  const { form, editor, isPending, richTextError, handleFormJobFn } =
    usePostJob(isEditMode);

  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <form
          onSubmit={form.onSubmit((values: string[]) =>
            handleFormJobFn(values)
          )}
          className="grid grid-cols gap-y-7"
        >
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">
                Company Background Cover
              </h1>
              <p className="text-textGray text-sm max-w-md">
                Upload your company background image to appear alongside the job
                listing. This will enhance the visibility and branding of your
                job post.
              </p>
            </div>
            <FileInput
              placeholder="Company background cover"
              {...form.getInputProps("background_img")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Job Title</h1>
              <p className="text-textGray text-sm max-w-md">
                Enter the official job title that candidates will see, such as
                'Software Engineer' or 'Marketing Manager.' This title should
                clearly reflect the position being offered.
              </p>
            </div>
            <TextInput
              placeholder="Enter Job Title"
              {...form.getInputProps("job_title")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">
                Job Description
              </h1>
              <p className="text-textGray text-sm">
                Provides a detailed overview of the position, outlining the key
                responsibilities, day-to-day duties, and expectations for the
                role. It should include the qualifications, skills, and
                experience required for the job, as well as any additional
                details that help candidates understand the nature of the role.
                A well-written job description attracts the right candidates and
                helps them assess if they are a good fit for the position."
              </p>
            </div>
            <div>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
              {richTextError && (
                <small className="text-red-500">{richTextError}</small>
              )}
            </div>
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Job Type</h1>
              <p className="text-textGray text-sm max-w-md">
                Select whether the job is On-site, Remote, or a Hybrid of both.
                This helps candidates understand where they will work.
              </p>
            </div>
            <TagsInput
              placeholder="Pick job type or you can enter a new type"
              data={[
                "Full-time",
                "Internship",
                "Part-time",
                "Freelancer",
                "Contract",
                "On-site",
                "Remote",
                "Hybrid",
              ]}
              acceptValueOnBlur
              {...form.getInputProps("type")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Job Location</h1>
              <p className="text-textGray text-sm max-w-md">
                Enter the specific location of the job, such as the city and
                country. For remote jobs, include the primary headquarters or
                remote availability.
              </p>
            </div>
            <TextInput
              placeholder="Enter Job Location"
              {...form.getInputProps("location")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Salary Range</h1>
              <p className="text-textGray text-sm max-w-md">
                Specify the salary range amount you are willing to pay for this
                position. You can leave this blank if you'd prefer not to
                disclose it.
              </p>
            </div>
            <TextInput
              placeholder="Enter salary range"
              {...form.getInputProps("salary_range")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">
                Experience Level
              </h1>
              <p className="text-textGray text-sm max-w-md">
                Select the required experience level for this role, such as
                Entry-level (0–2 years), Mid-level (3–5 years), or Senior-level
                (5+ years). This helps candidates self-assess their eligibility.
              </p>
            </div>
            <Select
              placeholder="Pick experience level"
              // value={formDataValue?.experience_level}
              data={[
                "Fresh-grad",
                "Less than 1 Year",
                "1-3 Years experience",
                "3-5 Years experience",
                "5+ Years experience",
              ]}
              {...form.getInputProps("experience_level")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Job Function</h1>
              <p className="text-textGray text-sm max-w-md">
                Select the primary function of the job, such as IT, Sales,
                Marketing, or Customer Service. This helps categorize the job
                for easier searching.
              </p>
            </div>
            <TagsInput
              placeholder="Pick job function or you can enter a new function"
              data={["IT", "Sales", "Marketing", "Customer Service"]}
              acceptValueOnBlur
              {...form.getInputProps("job_function")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Industry</h1>
              <p className="text-textGray text-sm max-w-md">
                Choose the industry this job belongs to, such as Technology,
                Healthcare, Finance, or Education. This will help potential
                applicants filter jobs by their desired industry.
              </p>
            </div>
            <TagsInput
              placeholder="Pick industry or you can enter a new industry"
              data={["Technology", "Healthcare", "Finance", "Education"]}
              acceptValueOnBlur
              {...form.getInputProps("industry")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:grid md:grid-cols-2 md:gap-x-4 md:items-center">
            <div className="grid grid-cols gap-y-3">
              <h1 className="text-textBlack font-bold text-lg">Job Expiry</h1>
              <p className="text-textGray text-sm max-w-md">
                Set the date when this job posting will expire and be
                automatically removed from the job listings.
              </p>
            </div>
            <DatePickerInput
              placeholder="Pick Date Expiry"
              valueFormat="DD/MM/YYYY"
              {...form.getInputProps("job_expiry")}
            />
          </div>
          <Divider my={7} size="xs" />
          <div className="grid grid-cols gap-y-6 md:flex md:items-center md:justify-between">
            <div className="grid grid-cols gap-y-3">
              <p className="text-textGray text-sm max-w-md">
                Once you've filled out all the necessary details, click this
                button to post your job listing live.
              </p>
            </div>
            <Button disabled={isPending} className="max-w-36" type="submit">
              {isPending && (
                <h1 className="flex items-center gap-x-2 text-sm">
                  <Icon
                    className="animate-spin"
                    icon="radix-icons:reload"
                    width="15"
                    height="15"
                  />
                  {isPending && isEditMode && "Posting..."}
                  {isPending && isEditMode && "Saving changes..."}
                </h1>
              )}
              {!isPending && !isEditMode && "Post job"}
              {isEditMode && "Save changes"}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default PostJobForm;
