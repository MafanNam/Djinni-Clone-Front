import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {Overview} from "@/components/dashboard/overview"
import {RecentSales} from "@/components/dashboard/recent-sales"
import {BriefcaseBusiness, UserRoundSearch, Users} from "lucide-react";

export default function Page() {
  return (
    <div className="flex-col mt-4 items-center justify-between md:flex">
      <div className="flex-1 w-full max-w-7xl space-y-4 p-8 pt-6">
        <Tabs defaultValue="salaries" className="space-y-4">
          <div className="flex items-center pb-4 justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Salaries</h2>
            <div className="flex items-center space-x-2">
              <TabsList>
                <TabsTrigger value="salaries">Salaries</TabsTrigger>
                <TabsTrigger value="marked">Market</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="salaries" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-bold">
                    Jobs
                  </CardTitle>
                  <BriefcaseBusiness className='text-muted-foreground w-5 h-5'/>
                </CardHeader>
                <CardContent className='flex justify-center space-x-16 md:space-x-5 lg:space-x-8 xl:space-x-16'>
                  <div>
                    <div className="text-sm">Total</div>
                    <p className="text-l text-muted-foreground">
                      <strong>8000</strong>
                    </p>
                  </div>
                  <div>
                    <div className="text-sm">Avg Salary</div>
                    <p className="text-l text-muted-foreground">
                      <strong>$ 3000</strong>
                    </p>
                  </div>
                  <div>
                    <div className="text-sm">Applications</div>
                    <p className="text-l text-muted-foreground">
                      <strong>37.0</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Candidates
                  </CardTitle>
                  <UserRoundSearch className='text-muted-foreground w-5 h-5'/>
                </CardHeader>
                <CardContent className='flex justify-center space-x-16 md:space-x-5 lg:space-x-8 xl:space-x-16'>
                  <div>
                    <div className="text-sm">Total</div>
                    <p className="text-l text-muted-foreground">
                      <strong>120000</strong>
                    </p>
                  </div>
                  <div>
                    <div className="text-sm">Avg Salary</div>
                    <p className="text-l text-muted-foreground">
                      <strong>$ 2000</strong>
                    </p>
                  </div>
                  <div>
                    <div className="text-sm">Proposals</div>
                    <p className="text-l text-muted-foreground">
                      <strong>1.0</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    All users
                  </CardTitle>
                  <Users className='text-muted-foreground w-5 h-5'/>
                </CardHeader>
                <CardContent className='flex justify-center space-x-16 md:space-x-5 lg:space-x-8 xl:space-x-16'>
                  <div>
                    <div className="text-sm">Total</div>
                    <p className="text-l text-muted-foreground">
                      <strong>20000</strong>
                    </p>
                  </div>
                  <div>
                    <div className="text-sm">Avg a day</div>
                    <p className="text-l text-muted-foreground">
                      <strong>150</strong>
                    </p>
                  </div>
                  <div>
                    <div className="text-sm">Now</div>
                    <p className="text-l text-muted-foreground">
                      <strong>20</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview/>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Vacancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales/>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}